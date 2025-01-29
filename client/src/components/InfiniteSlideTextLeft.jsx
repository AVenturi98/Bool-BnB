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
          {textItems.map((text, index) => (
            <div key={index} className={styles.slide}>
              <span>{text}</span>
            </div>
          ))}
          {textItems.map((text, index) => (
            <div key={`clone-${index}`} className={styles.slide}>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
