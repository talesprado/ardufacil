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
        controller.enqueue(this.chunks);
    }
}
export default class Board{
    
    constructor(){              
        this.request = [];  
    }
    async requestPort(){
        this.port = await navigator.serial.requestPort();
    }

    async disconnect(){        
        try{
          await this.getAvailablePorts();
          this.port = this.availablePorts[0];
          if(this.port){
            await this.port.forget();
          } 
        }catch(e){
            console.log(e);
        }   
    }

    async addRequest(request){
        this.request.push( request );
    }

    async getAvailablePorts(){
        this.availablePorts = await navigator.serial.getPorts();
        return this.availablePorts;
    }

    async requestInfo(){    
        this.writer = this.textEncoder.writable.getWriter();
        
        for(let x=0; x < this.request.length; x++){
            await this.writer.write(this.request[x]);              
        }
        this.request.splice(0,this.request.length);
        await this.writer.write("{\"action\": 0}");
        this.writer.releaseLock();
          
    }
    async requestVarUpdate(varName, varType, newValue){
        const variable = "{\"name\": \"" + varName + "\", \"value\": "+ newValue +", \"type\": \""+ varType +"\" }";
        const strUpdate = "{\"action\": 1, \"variable\": "+ variable +"}";       
        this.addRequest(strUpdate);
    }
    async requestSaveValue(){
        const strUpdate = "{\"action\": 2}";       
        this.addRequest(strUpdate);
    }
    async readSerial(keepReading = true){
        
            while (this.port.readable && keepReading){   
                if(!this.reader){
                    this.reader = this.textDecoder.readable
                    .pipeThrough(new TransformStream(new LineBreakTransformer()))
                    .getReader();
                }             
                while (true) {           
                    const { value, done } = await this.reader.read();           
                    if (done) {
                        this.reader.releaseLock();
                        break;
                    }
                    let jsons = value;             
                    return jsons;
                }
            }
        
    }
}