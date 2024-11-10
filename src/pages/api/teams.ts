import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import Team from '../../lib/models/team';
import DailyTeam from '../../lib/models/dailyTeam';

export type Data = {
  success: boolean;
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await connectToDatabase();
    switch (req.method) {
      case 'GET':
        const { random } = req.query;

        if (random === 'true') {
          let dailyTeam = await DailyTeam.findOne({});

          const now = new Date();
          const midnight = new Date(now);
          midnight.setHours(0, 0, 0, 0);

          if (!dailyTeam || dailyTeam.date < midnight) {
            const newRandomTeam = await Team.aggregate([
              { $sample: { size: 1 } },
            ]);
            const newDailyTeamData = {
              team: newRandomTeam[0],
              date: midnight,
            };

            if (dailyTeam) {
              await DailyTeam.updateOne({}, newDailyTeamData);
            } else {
              await DailyTeam.create(newDailyTeamData);
            }

            dailyTeam = newDailyTeamData;
          }

          res.status(200).json({ success: true, data: dailyTeam.team });
        } else {
          const teams = await Team.find({});
          res.status(200).json({ success: true, data: teams });
        }
        break;

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
}
