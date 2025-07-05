export const orderWatchTrend = (data: { date: string; minutes: number }[]) => {
  return data.sort((a, b) => {
    const parseDate = (str: string) =>
      new Date(`${str} ${new Date().getFullYear()}`);
    return parseDate(a.date).getTime() - parseDate(b.date).getTime();
  });
};
