import { Button, Card, Statistic } from "antd";
export interface CardStatisticProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  onClick: () => void;
}

export const CardStatistic: React.FC<CardStatisticProps> = (props) => {
  const { title, value, icon, onClick } = props;

  return (
    <Card>
      <div>
        {icon}
        <Statistic title={title} value={value} />
        <Button type={"link"} onClick={onClick}>
          Detail
        </Button>
      </div>
    </Card>
  );
};
