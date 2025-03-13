import confetti from 'canvas-confetti';

export default function handleConfettiClick() {
  confetti({
    particleCount: 250,
    spread: 150,
    origin: { y: 0.6 },
    colors: ['#D9B382', '#6D454C', '#F7F5F2', '#F5E6D1'],
  });
}
