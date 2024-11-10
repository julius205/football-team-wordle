import React, { useState } from 'react';
import TeamGrid from './TeamGrid';
import { Team } from './Team';

type SelectBarProps = {
  teams: Team[];
  onTeamGuess: (team: Team) => void;
};

const SelectBar: React.FC<SelectBarProps> = ({ teams, onTeamGuess }) => {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value) {
      setIsOpen(true);
    }
  };

  const handleReset = () => {
    setSearchText('');
  };

  return (
    <div className="lg:min-w-[600px] w-[400px]">
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search team..."
          value={searchText}
          onChange={handleInputChange}
          className="p-2 rounded-lg w-full bg-black"
        />
        {searchText && (
          <button
            onClick={handleReset}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '28px',
            }}
          >
            ×
          </button>
        )}
      </div>

      {isOpen && searchText && (
        <div className="mt-2 shadow-md">
          <TeamGrid teams={filteredTeams} onTeamGuess={onTeamGuess} />
        </div>
      )}
    </div>
  );
};

export default SelectBar;
