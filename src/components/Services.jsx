
import {
  FaGavel,
  FaHandshake,
  FaShieldAlt,
  FaBalanceScale,
  FaUniversity,
  FaUserShield
} from 'react-icons/fa';


const services = [
  {
    icon: <FaGavel size={32} />,
    title: 'Litigation',
    description: 'Representation in civil and criminal cases.'
  },
  {
    icon: <FaHandshake size={32} />,
    title: 'Contract Law',
    description: 'Drafting and reviewing agreements.'
  },
  {
    icon: <FaShieldAlt size={32} />,
    title: 'Corporate Law',
    description: 'Comprehensive business legal support.'

  },
  {
    icon: <FaBalanceScale size={32} />,
    title: 'Legal Consulting',
    description: 'Strategic advice to navigate complex legal matters.'
  },
  {
    icon: <FaUniversity size={32} />,
    title: 'Tax Law',
    description: 'Guidance on tax compliance and disputes.'
  },
  {
    icon: <FaUserShield size={32} />,
    title: 'Family Law',
    description: 'Support for family-related legal issues.'

  }
];

export default function Services() {
  return (

    <section className="services section" id="services">

      {services.map((s, idx) => (
        <div key={idx} className="service-card">
          <div className="icon">{s.icon}</div>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
        </div>
      ))}
    </section>
  );
}
