import { Team } from '../components/Team';

type MatchStatus = Record<string, { color: string; backgroundImage?: string }>;

// Funktion zum Vergleichen von zwei Teams
export function compareTeams(team: Team, randomTeam: Team): MatchStatus {
  const getTeamColors = (colors: string): string[] => {
    return colors.split(' / ').map((color) => color.trim());
  };

  const teamColors = getTeamColors(team.clubColors);
  const randomTeamColors = getTeamColors(randomTeam.clubColors);

  return {
    name: { color: team.name === randomTeam.name ? 'green' : '#891212' },
    league: { color: team.league === randomTeam.league ? 'green' : '#891212' },
    founded: {
      color: team.founded === randomTeam.founded ? 'green' : '#891212',
      backgroundImage:
        team.founded < randomTeam.founded
          ? '/images/arrowUp.png'
          : team.founded > randomTeam.founded
          ? '/images/arrowDown.png'
          : undefined,
    },
    coachNationality: {
      color:
        team.coachNationality === randomTeam.coachNationality
          ? 'green'
          : '#891212',
    },
    marketValue: {
      color: team.marketValue === randomTeam.marketValue ? 'green' : '#891212',
      backgroundImage:
        team.marketValue < randomTeam.marketValue
          ? '/images/arrowUp.png'
          : team.marketValue > randomTeam.marketValue
          ? '/images/arrowDown.png'
          : undefined,
    },
    clubColors: {
      color:
        teamColors.every((color) => randomTeamColors.includes(color)) &&
        randomTeamColors.every((color) => teamColors.includes(color))
          ? 'green'
          : teamColors.some((color) => randomTeamColors.includes(color))
          ? '#C0930D'
          : '#891212',
    },
    kitSponsor: {
      color: team.kitSponsor === randomTeam.kitSponsor ? 'green' : '#891212',
    },
  };
}
