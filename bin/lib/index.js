import execa from "execa";
import path from "path";

// Probably should have so much error checking but ... ya know
export default async function create(projectName, flags) {
  console.log({ projectName, flags });

  // 1. Clone https://github.com/SimeonGriggs/sanity-opinionated-studio
  // into /this/dir/projectName
  const basePath = path.resolve(projectName || process.cwd());
  const repo = `git@github.com:SimeonGriggs/sanity-opinionated-studio.git`;

  const { stdout: stdoutClone } = await execa("git", [
    `clone`,
    repo,
    projectName,
  ]);
  console.log(stdoutClone);

  // 2. Install dependencies
  const { stdout: stdoutDeps, stderr: stderrDeps } = await execa("npm", [`i`], {
    cwd: basePath,
  });
  console.log({ stdoutDeps, stderrDeps });

  // 3. Run `sanity init` inside that folder with empty schema
  const { stdout, stderr } = await execa(
    "npx",
    [
      `sanity`,
      `init`,
      `-y`,
      `--create-project`,
      `${projectName}`,
      `--dataset`,
      `${flags.dataset}`,
      `--visibility`,
      `${flags.visibility}`,
      `--template`,
      `clean`,
      `--output-path`,
      `./`,
      `--reconfigure`,
    ],
    {
      cwd: basePath,
    }
  );
  console.log({ stderr, stdout });
}
