export default function Card({ name, sprite, onClick }: any) {
    return (
      <div className="poke-card" onClick={onClick}>
        <h2>{name}</h2>
        <img src={sprite} alt={`Pokemon ${name}`} />
      </div>
    );
  }