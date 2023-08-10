export const EXP_BAR = 50;

export default function calculateUserLevel(m_exp: number): number {
  // 10, 20, 30, 40, 50, 60, 70, 80, 90
  // 1, 2, 3, 4, 5, 6, 7, 8, 9

  // return parseInt(String(m_exp / 20), 10);
  return Math.floor(m_exp / EXP_BAR);
}
