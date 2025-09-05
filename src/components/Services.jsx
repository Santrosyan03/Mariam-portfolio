import { FaGavel, FaHandshake, FaShieldAlt } from 'react-icons/fa';

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
  }
];

export default function Services() {
  return (
    <section className="services">
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
