import fs from 'fs';
import path from 'path';
import heicConvert from 'heic-convert';

const dir = path.join(process.cwd(), 'src/polaroids');

const run = async () => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.toLowerCase().endsWith('.heic')) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(/\.heic$/i, '.jpg'));
      
      console.log(`Converting ${file}...`);
      const inputBuffer = fs.readFileSync(inputPath);
      
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.95
      });
      
      fs.writeFileSync(outputPath, outputBuffer);
      fs.unlinkSync(inputPath); // Delete old heic file
      console.log(`Successfully converted to ${outputPath}`);
    }
  }
};

run().catch(console.error);
