import mongoose from 'mongoose';

const dailyTeamSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const DailyTeam =
  mongoose.models.DailyTeam || mongoose.model('DailyTeam', dailyTeamSchema);
export default DailyTeam;
