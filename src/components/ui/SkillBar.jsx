import {
  FaBrain,
  FaCloudUploadAlt,
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaJava,
  FaJsSquare,
  FaMicrochip,
  FaPython,
  FaReact,
  FaRobot,
  FaRoute,
  FaTerminal,
} from 'react-icons/fa';
import { SiPytorch } from 'react-icons/si';
import { FiCode, FiLayers } from 'react-icons/fi';

const ICON_MAP = {
  python: <FaPython />,
  pytorch: <SiPytorch />,
  ai: <FaBrain />,
  ml: <FaRobot />,
  react: <FaReact />,
  javascript: <FaJsSquare />,
  css: <FaCss3Alt />,
  router: <FaRoute />,
  sql: <FaDatabase />,
  java: <FaJava />,
  database: <FiLayers />,
  cpu: <FaMicrochip />,
  git: <FaGitAlt />,
  vercel: <FaCloudUploadAlt />,
  copilot: <FaRobot />,
  terminal: <FaTerminal />,
};

function SkillBar({ name, level, icon }) {
  const iconNode = ICON_MAP[icon] || <FiCode />;

  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-name-group">
          <span className="skill-icon-box" aria-hidden="true">
            {iconNode}
          </span>
          <span>{name}</span>
        </span>
        <span className="skill-level-text">{level}%</span>
      </div>
      <div
        className="skill-track"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} ${level}%`}
      >
        <div className="skill-fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}

export default SkillBar;
