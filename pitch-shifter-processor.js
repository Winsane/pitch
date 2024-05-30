class PitchShifterProcessor extends AudioWorkletProcessor {
    static get parameterDescriptors() {
        return [{ name: 'pitchRatio', defaultValue: 1 }];
    }

    constructor() {
        super();
        this.buffer = [];
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const output = outputs[0];
        const pitchRatio = parameters.pitchRatio[0];

        if (input.length > 0) {
            const inputChannel = input[0];
            const outputChannel = output[0];

            for (let i = 0; i < inputChannel.length; i++) {
                this.buffer.push(inputChannel[i]);
            }

            if (this.buffer.length >= outputChannel.length) {
                for (let i = 0; i < outputChannel.length; i++) {
                    const index = Math.floor(i * pitchRatio);
                    if (index < this.buffer.length) {
                        outputChannel[i] = this.buffer[index];
                    }
                }
                this.buffer = this.buffer.slice(outputChannel.length);
            }
        }
        return true;
    }
}

registerProcessor('pitch-shifter-processor', PitchShifterProcessor);
