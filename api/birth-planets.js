import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Missing 'date' query parameter (YYYY-MM-DD)" });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'birth-zodiac.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const zodiacData = JSON.parse(rawData);

    const signs = zodiacData[date];

    if (!signs) {
      return res.status(404).json({ error: `No data found for date: ${date}` });
    }

    return res.status(200).json(signs); // 回傳該日期的 { sun, moon, mercury, venus, mars }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read zodiac data', detail: err.message });
  }
}
