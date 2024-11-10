import React from 'react';
import Card from './Card';

export type Team = {
  _id: string;
  name: string;
  league: string;
  founded: number;
  coachNationality: string;
  clubColors: string;
  marketValue: number;
  emblemUrl: string;
  kitSponsor: string;
};

type TeamProps = {
  team: Team & {
    teamStatus?: Record<string, { color: string; backgroundImage?: string }>;
  };
  isInSelectBar?: boolean;
  onTeamGuess: (team: Team) => void;
  isRandomTeam?: boolean;
};

const leagueImageMap: Record<string, string> = {
  Bundesliga: '/images/bl.png',
  'Premier League': '/images/pl.png',
  'La Liga': '/images/laliga.png',
  'Serie A': '/images/seriea.png',
  'Ligue 1': '/images/ligue1.png',
  Eredivisie: '/images/ered.png',
};

const kitSponsorImageMap: Record<string, string> = {
  Acerbis: './images/acerbis.png',
  Adidas: './images/adidas.png',
  Castore: './images/castore.png',
  Craft: './images/craft.png',
  EA7: './images/ea7.png',
  'Eye Sport': './images/eyesport.png',
  Hummel: './images/hummel.png',
  JAKO: './images/jako.png',
  Jako: './images/jako.png',
  Joma: './images/joma.png',
  Kappa: './images/kappa.png',
  Kelme: './images/kelme.png',
  'Le Coq Sportif': './images/lecoqsportif.png',
  Lotto: './images/lotto.png',
  M908: './images/m908.png',
  Macron: './images/macron.png',
  Mizuno: './images/mizuno.png',
  'New Balance': './images/nb.png',
  Nike: './images/nike.png',
  Nocta: './images/nocta.png',
  Puma: './images/puma.png',
  'Robey Sports': './images/robey.png',
  Stanno: './images/stanno.png',
  SUDU: './images/sudu.png',
  Umbro: './images/umbro.png',
};

const getTeamColors = (colors: string): string[] => {
  return colors.split(' / ').map((color) => {
    switch (color.trim()) {
      case 'Sky Blue':
        return 'Skyblue';
      case 'Navy Blue':
        return 'Navy';
      case 'Claret':
        return '#7B1032';
      case 'Royal Blue':
        return 'Royalblue';
      default:
        return color.trim();
    }
  });
};

const TeamRow: React.FC<TeamProps> = ({
  team,
  isInSelectBar = false,
  onTeamGuess,
}) => {
  const handleTeamClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onTeamGuess(team);
  };

  const { teamStatus } = team;

  const cards = [
    <Card
      key="emblemUrl"
      image={team.emblemUrl}
      isInSelectBar={isInSelectBar}
      color={teamStatus?.name.color}
    />,
    <Card
      key="league"
      image={leagueImageMap[team.league]}
      isInSelectBar={isInSelectBar}
      color={teamStatus?.league.color}
    />,
    <Card
      key="founded"
      text={team.founded}
      isInSelectBar={isInSelectBar}
      color={teamStatus?.founded.color}
      backgroundImage={teamStatus?.founded.backgroundImage}
    />,
    <Card
      key="coachNationality"
      image={
        team.coachNationality === 'USA'
          ? 'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png'
          : team.coachNationality === 'Northern Ireland'
          ? 'https://www.nationalflaggen.de/media/770/flagge-nordirland.gif'
          : `https://cdn.countryflags.com/thumbs/${team.coachNationality.toLowerCase()}/flag-square-250.png`
      }
      isInSelectBar={isInSelectBar}
      color={teamStatus?.coachNationality.color}
    />,
    <Card
      key="marketValue"
      text={`${
        team.marketValue < 1000
          ? `${team.marketValue} Mio.`
          : `${(team.marketValue / 1000).toFixed(1)} Mrd.`
      }`}
      isInSelectBar={isInSelectBar}
      color={teamStatus?.marketValue.color}
      backgroundImage={teamStatus?.marketValue.backgroundImage}
    />,
    <Card
      key="clubColors"
      colorElements={
        <div className="club-colors flex justify-center items-center w-full">
          {getTeamColors(team.clubColors).map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color,
                borderRadius: '2px',
                border: '0.6px solid white',
              }}
              className={`
                ${
                  isInSelectBar
                    ? 'w-[9px] h-[26px] lg:w-[14px] lg:h-[50px]'
                    : 'w-[10px] h-[30px] lg:w-[18px] lg:h-[70px]'
                } 
                mr-[4px]
              `}
            />
          ))}
        </div>
      }
      isInSelectBar={isInSelectBar}
      color={teamStatus?.clubColors.color}
    />,
    <Card
      key="kitSponsor"
      image={kitSponsorImageMap[team.kitSponsor]}
      isInSelectBar={isInSelectBar}
      color={teamStatus?.kitSponsor.color}
    />,
  ];

  return (
    <div
      onClick={isInSelectBar ? handleTeamClick : () => {}}
      className={`grid grid-cols-7 gap-1 lg:gap-2 cursor-pointer bg-none transition-all`}
    >
      {cards}
    </div>
  );
};

export default TeamRow;
