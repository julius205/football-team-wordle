import Card from '@/components/Card';
import SelectBar from '@/components/SelectBar';
import TeamRow, { Team } from '@/components/Team';
import { headTitles } from '@/components/TeamGrid';
import { compareTeams } from '@/utils/teamComparer';

import { useEffect, useState } from 'react';

export default function Home() {
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [guessedTeams, setGuessedTeams] = useState<Team[]>([]);
  const [randomTeam, setRandomTeam] = useState<Team | null>(null);
  const [guessedCorrect, setGuessedCorrect] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    fetch('/api/teams')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const teams = data.data.map((team: any) => ({
            name: team.name,
            league: team.league,
            founded: team.founded,
            coachNationality: team.coachNationality,
            clubColors: team.clubColors,
            marketValue: team.marketValue,
            kitSponsor: team.kitSponsor,
            emblemUrl: team.emblemUrl,
            _id: team._id,
          }));
          setAllTeams(teams);
        }
      })
      .catch((error) => console.error(error));

    const today = new Date().toISOString().slice(0, 10);
    const lastPlayDate = localStorage.getItem('lastPlayDate');

    if (lastPlayDate !== today) {
      localStorage.clear();
      localStorage.setItem('lastPlayDate', today);
      fetchRandomTeam();
    } else {
      const storedGuessedTeams = JSON.parse(
        localStorage.getItem('guessedTeams') || '[]'
      );
      const storedGuessedCorrect =
        localStorage.getItem('guessedCorrect') === 'true';
      const storedAttempts = parseInt(
        localStorage.getItem('attempts') || '0',
        10
      );

      setGuessedTeams(storedGuessedTeams);
      setGuessedCorrect(storedGuessedCorrect);
      setAttempts(storedAttempts);
    }
  }, []);

  const fetchRandomTeam = () => {
    fetch('/api/teams?random=true')
      .then((res) => res.json())
      .then((data) => setRandomTeam(data.data))
      .catch((error) => console.error(error));
  };

  const handleTeamGuess = (team: Team): void => {
    if (!guessedTeams.includes(team) && randomTeam && attempts < 6) {
      const teamStatus = compareTeams(team, randomTeam);

      setGuessedTeams((prevGuessedTeams) => [
        ...prevGuessedTeams,
        { ...team, teamStatus },
      ]);

      localStorage.setItem(
        'guessedTeams',
        JSON.stringify([...guessedTeams, { ...team, teamStatus }])
      );
      localStorage.setItem('attempts', (attempts + 1).toString());

      if (team._id === randomTeam?._id) {
        setGuessedCorrect(true);
        localStorage.setItem('guessedCorrect', 'true');
      } else if (attempts + 1 >= 6) {
        setGuessedCorrect(false);
        localStorage.setItem('guessedCorrect', 'false');
      }

      setAttempts(attempts + 1);
    }
  };

  const availableTeams = allTeams.filter(
    (team) => !guessedTeams.some((guessedTeam) => guessedTeam._id === team._id)
  );

  return (
    <div className="flex flex-col items-center mt-20 mb-20">
      <img className="w-40 lg:w-56 mb-6" src="/images/logo.png" />

      {!guessedCorrect && (
        <SelectBar teams={availableTeams} onTeamGuess={handleTeamGuess} />
      )}

      <div className="mt-4">
        {guessedTeams.length > 0 && (
          <div>
            <div className="p-2 grid grid-cols-7 font-semibold">
              {headTitles.map((head) => (
                <div className="lg:text-xs text-[8px] font-light text-center">
                  {head}
                </div>
              ))}
            </div>
            <div className="p-2">
              {guessedTeams.map((guessedTeam) => (
                <div key={guessedTeam._id} className="mb-4">
                  <TeamRow team={guessedTeam} onTeamGuess={handleTeamGuess} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {attempts >= 6 || guessedCorrect ? (
        <div className="lg:mt-4">
          {guessedCorrect ? (
            <p className="text-green-500 lg:text-lg text-xs">
              Congratulations, you guessed the right team!
            </p>
          ) : (
            <p className="text-red-500">
              Game Over! Today's team was: {randomTeam?.name}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
