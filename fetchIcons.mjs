import fs from 'fs';
import path from 'path';
import https from 'https';

const techList = [
    { name: 'Figma', id: 'figma' },
    { name: 'Photoshop', id: 'adobephotoshop' },
    { name: 'HTML', id: 'html5' },
    { name: 'CSS', id: 'css3' },
    { name: 'JavaScript', id: 'javascript' },
    { name: 'TypeScript', id: 'typescript' },
    { name: 'React', id: 'react' },
    { name: 'Expo', id: 'expo' },
    { name: 'Tailwind CSS', id: 'tailwindcss' },
    { name: 'Bootstrap', id: 'bootstrap' },
    { name: 'Next.js', id: 'nextdotjs' },
    { name: 'Vite', id: 'vite' },
    { name: 'MySQL', id: 'mysql' },
    { name: 'Supabase', id: 'supabase' },
    { name: 'Python', id: 'python' },
    { name: 'C', id: 'c' },
    { name: 'C++', id: 'cplusplus' },
    { name: 'Express', id: 'express' },
    { name: 'Node.js', id: 'nodedotjs' },
    { name: 'Flask', id: 'flask' },
    { name: 'GraphQL', id: 'graphql' },
    { name: 'Git', id: 'git' },
    { name: 'GitHub', id: 'github' },
    { name: 'Linux', id: 'linux' },
    { name: 'Postman', id: 'postman' },
    { name: 'Docker', id: 'docker' },
    { name: 'GitHub Copilot', id: 'githubcopilot' },
    { name: 'MongoDB', id: 'mongodb' }
];

const basePath = path.join(process.cwd(), 'src', 'assets', 'tech-icons');
if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
}

function fetchIcon(tech) {
    return new Promise((resolve) => {
        const url = `https://cdn.simpleicons.org/${tech.id}/white`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    fs.writeFileSync(path.join(basePath, `${tech.id}.svg`), data);
                    console.log(`Downloaded ${tech.id}.svg`);
                } else {
                    console.error(`Failed to download ${tech.name}. Status code: ${res.statusCode}`);
                }
                resolve();
            });
        }).on('error', err => {
            console.error(`Error downloading ${tech.id}: ${err.message}`);
            resolve();
        });
    });
}

async function main() {
    for (const tech of techList) {
        await fetchIcon(tech);
    }
}
main();
