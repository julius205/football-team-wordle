import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: String,
  league: String,
  founded: Number,
  coachNationality: String,
  clubColors: String,
  marketValue: Number,
  kitSponsor: String,
});

export default mongoose.models.Team ||
  mongoose.model('Team', TeamSchema, 'football_teams');
