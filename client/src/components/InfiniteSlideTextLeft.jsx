import styles from "./InfiniteSlideTextLeft.module.css";

export default function InfiniteSlideTextLeft() {
  const textItems = [
    "Colazione",
    "Vista",
    "Camere",
    "Prenotazione",
    "Accoglienza",
    "Biancheria",
    "Wi-Fi",
    "Relax",
    "Colazione",
    "Vista",
    "Camere",
    "Prenotazione",
    "Accoglienza",
    "Biancheria",
    "Wi-Fi",
    "Relax",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <div className={styles.slideTrack}>
          {textItems.map((text, index) => {
            const hue = (index * 20 + 100) % 150;
            const color1 = `hsl(${hue}, 70%, 40%)`;
            const color2 = `hsl(${hue}, 80%, 60%)`;

            return (
              <div key={index} className={styles.slide}>
                <span
                  style={{
                    background: `-webkit-linear-gradient(45deg, ${color1}, ${color2})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {text}
                </span>
              </div>
            );
          })}
          {textItems.map((text, index) => {
            const hue = (index * 20 + 100) % 150;
            const color1 = `hsl(${hue}, 70%, 40%)`;
            const color2 = `hsl(${hue}, 80%, 60%)`;

            return (
              <div key={`clone-${index}`} className={styles.slide}>
                <span
                  style={{
                    background: `-webkit-linear-gradient(45deg, ${color1}, ${color2})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
