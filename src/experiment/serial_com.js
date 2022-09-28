class LineBreakTransformer {
    constructor() {
        // A container for holding stream data until a new line.
        this.chunks = "";
    }

    transform(chunk, controller) {
        // Append new chunks to existing chunks.
        this.chunks += chunk;
        // For each line breaks in chunks, send the parsed lines out.
        const lines = this.chunks.split("/EOJO");//("\r\n");
        this.chunks = lines.pop();
        lines.forEach((line) => controller.enqueue(line));
    }

    flush(controller) {
        // When the stream is closed, flush any remaining chunks out.
        console.log("flushed");
        controller.enqueue(this.chunks);
    }
}
export default class Board{

    constructor(){              
        
    }
    async requestPort(){
        this.port = await navigator.serial.requestPort();
    }
    async getAvailablePorts(){
        this.availablePorts = await navigator.serial.getPorts();
        return this.availablePorts;
    }
    async requestInfo(){
       // this.textEncoder = new TextEncoderStream();
       // this.writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
       
        
        this.writer = this.textEncoder.writable.getWriter();  
        
        await this.writer.write("{\"action\": \"update\"}");
        await this.writer.close();
        await this.writableStreamClosed;
        await this.writer.releaseLock();
        
    }
    async readSerial(){
        while (this.port.readable){
           // this.textDecoder = new TextDecoderStream();
           // this.readableStreamClosed = this.port.readable.pipeTo(this.textDecoder.writable);     
           console.log(this.textDecoder);
           console.log(this.textEncoder);  
            this.reader = this.textDecoder.readable
                .pipeThrough(new TransformStream(new LineBreakTransformer()))
                .getReader();
            
            while (true) {
                const { value, done } = await this.reader.read();                 
                if (done) {
                    this.reader.releaseLock();
                    break;
                }
                let jsons = value;
                console.log(jsons);
                let jsonObj = JSON.parse(jsons);
                document.getElementById("spEx").innerHTML = jsonObj.name;
                document.getElementById("spDesc").innerHTML = jsonObj.desc;
                document.getElementById("spVar").innerHTML = jsonObj.variables[0].value;
                console.log(jsonObj);
            }
        }
    }
}