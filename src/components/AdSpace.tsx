import { Card } from '@/components/ui/card';

interface AdSpaceProps {
  imgUrl: string;
  clickUrl: string;
  height?: string;
}

export default function AdSpace({ imgUrl, clickUrl, height = 'h-32' }: AdSpaceProps) {
  return (
    <Card className={`${height} flex items-center justify-center border-2 border-dashed border-muted bg-muted/20 overflow-hidden`}>
      <a href={clickUrl} target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center">
        <img src={imgUrl} alt="Advertisement" className="w-full h-full object-cover" />
      </a>
    </Card>
  );
}
