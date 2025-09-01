export interface FileNode {
  type: 'file';
  name: string;
  path: string;
  content: string;
}

export interface DirectoryNode {
  type: 'directory';
  name: string;
  path: string;
  children: { [key: string]: FsNode };
}

export type FsNode = FileNode | DirectoryNode;

const buildPaths = (node: DirectoryNode, path: string) => {
  node.path = path;
  Object.keys(node.children).forEach(key => {
    const child = node.children[key];
    child.name = key;
    const childPath = path === '~' ? `~/${key}` : `${path}/${key}`;
    if (child.type === 'directory') {
      buildPaths(child as DirectoryNode, childPath);
    } else {
      child.path = childPath;
    }
  });
};

export const root: DirectoryNode = {
  type: 'directory',
  name: '~',
  path: '~',
  children: {
    'Education': {
      type: 'directory',
      name: 'Education',
      path: '',
      children: {
        'Bachelors.info': {
          type: 'file',
          name: 'Bachelor of Computer Applications',
          path: '',
          content: 'Completed BCA in Data Science at SRM Institute of Science & Technology, Ghaziabad, U.P.\nSpecialized in software development, artificial intelligence, and data-driven applications.',
        },
        'Intermediate.info': {
          type: 'file',
          name: '12th with PCMB',
          path: '',
          content: 'Completed Senior Secondary (12th grade) with Physics, Chemistry, Mathematics, and Biology, providing a strong foundation in analytical and problem-solving skills.',

        },
        'School.info': {
          type: 'file',
          name: 'School',
          path: '',
          content: 'Completed schooling with emphasis on science and mathematics, actively participating in academic and extracurricular activities.',
        },
      },
    },
    'Projects': {
      type: 'directory',
      name: 'Projects',
      path: '',
      children: {
        'ubuntu-portfolio.info': {
          type: 'file',
          name: 'Ubuntu Portfolio',
          path: '',
          content: 'A personal portfolio cleverly designed to function as an interactive Ubuntu OS, presenting my skills and projects through a unique and familiar interface.',
        },
        'resume-ranker.info': {
          type: 'file',
          name: 'Intelligent Resume Ranker',
          path: '',
          content: 'AI-powered solution to rank candidates based on job description using machine learning techniques.',
        },
        'go-url.info': {
          type: 'file',
          name: 'GoURL - an URL Shortener',
          path: '',
          content: 'A URL shortener web app built on Golang for making long URLs shorter and more manageable.',
        },
        'personal-portfolio.info': {
          type: 'file',
          name: 'Personal Portfolio',
          path: '',
          content: 'Created a personal portfolio to showcase my skills through a web app.',
        },
        'diabetes-model.info': {
          type: 'file',
          name: 'Diabetes Model',
          path: '',
          content: 'Machine Learning model for predicting diabetes of a person using their feature values (health indicators).',
        },
        'forestfire-model.info': {
          type: 'file',
          name: 'Algerian Forestfire Model',
          path: '',
          content: 'A Linear Regression model that predicts Fire Weather Index (FWI) on the Algerian forest fires dataset.',
        },
      },
    },
    'Certificates': {
      type: 'directory',
      name: 'Certificates',
      path: '',
      children: {
        'quiz-mantra.info': {
          type: 'file',
          name: 'Quiz Mantra',
          path: '',
          content: 'Quiz Mantra – IT-Club SRM-IST (2024)',
        },
        'python-kaggle.info': {
          type: 'file',
          name: 'Python',
          path: '',
          content: 'Python – Kaggle (2024)',
        },
        'java-course.info': {
          type: 'file',
          name: 'Java Course',
          path: '',
          content: 'Java Course – Scaler (2023)',
        },
        'ml-data-analytics.info': {
          type: 'file',
          name: 'Machine Learning and Data Analytics using Python',
          path: '',
          content: 'Machine Learning and Data Analytics using Python – SRM IST (2023)',
        },
        'intro-data-science.info': {
          type: 'file',
          name: 'Intro. to Data Science',
          path: '',
          content: 'Intro. to Data Science – SkillUp (2023)',
        },
      }
    },
    'Skills': {
      type: 'directory',
      name: 'Skills',
      path: '',
      children: {
        'programming.info': {
          type: 'file',
          name: 'Programming',
          path: '',
          content: "Proficient in C/C++, Python, JavaScript, TypeScript, and Go.\nStrong experience in writing clean, efficient, and scalable code.",

        },
        'web.info': {
          type: 'file',
          name: 'Frontend',
          path: '',
          content: 'Skilled in building modern, responsive UIs with HTML, CSS, JavaScript, React, Next.js, and TypeScript.',

        },
        'backend.info': {
          type: 'file',
          name: 'Backend',
          path: '',
          content: 'Experienced in building scalable server-side applications with Node.js, Express, REST APIs, and FastAPI.',

        },
        'database.info': {
          type: 'file',
          name: 'Database',
          path: '',
          content: 'Hands-on experience with relational and NoSQL databases including MySQL, MongoDB, PostgreSQL, and Redis.',

        }
      }
    },
    'Contact': {
      type: 'directory',
      name: 'Contact',
      path: '',
      children: {
        'email.info': {
          type: 'file',
          name: 'Email',
          path: '',
          content: 'Reach out at: theujjwalsinghh@gmail.com',

        }
      }
    },
    'README.md': {
      type: 'file',
      name: 'README.md',
      path: '',
      content: `✨✨ Ujjwal's Ubuntu WebApp ✨✨\n[ " This is a web-based portfolio of the Ujjwal Kumar Singh based on the Ubuntu desktop environment, built with Next.js and Tailwind CSS. Explore files, projects, and skills in an interactive terminal-like interface "]`,

    }
  }
};

buildPaths(root, '~');

export const findNodeByPath = (startNode: DirectoryNode, path: string): FsNode | null => {
  if (path === '~') {
    return startNode;
  }

  const pathParts = path.startsWith('~/') ? path.substring(2).split('/') : (path === '~' ? [] : path.split('/'));

  if (path === '~' || path === '') {
    return startNode;
  }

  let currentNode: FsNode = startNode;

  for (const part of pathParts) {
    if (currentNode.type === 'directory' && currentNode.children[part]) {
      currentNode = currentNode.children[part];
    } else {
      return null;
    }
  }

  return currentNode;
};