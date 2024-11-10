import React from 'react';
import TeamRow, { Team } from './Team';

type TeamGridProps = {
  teams: Team[];
  onTeamGuess: (team: Team) => void;
};

export const headTitles = [
  'Team',
  'League',
  'Founded',
  'Coach',
  'Marketvalue',
  'Club Colors',
  'Kit Sponsor',
];

const TeamGrid: React.FC<TeamGridProps> = ({ teams, onTeamGuess }) => {
  return (
    <div className="lg:min-w-[600px] mt-4">
      <div className="lg:p-2 px-8 grid grid-cols-7">
        {headTitles.map((head) => (
          <div className="lg:text-xs text-[6px] font-light text-center">
            {head}
          </div>
        ))}
      </div>
      <div className="lg:mt-2  -mt-1 flex flex-col items-center">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="p-2 flex justify-between">
              <TeamRow
                team={team}
                isInSelectBar={true}
                onTeamGuess={onTeamGuess}
              />
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-500">No team found</div>
        )}
      </div>
    </div>
  );
};

export default TeamGrid;
