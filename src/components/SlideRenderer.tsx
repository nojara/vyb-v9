import { ComputedSlide } from '@/data/slides';
import { SlideActiveContext } from '@/context/SlideActiveContext';
import HeroCenterSlide from './slides/HeroCenterSlide';
import EditorialLeftSlide from './slides/EditorialLeftSlide';
import EditorialSplitSlide from './slides/EditorialSplitSlide';
import CardGridSlide from './slides/CardGridSlide';
import ManifestoSlide from './slides/ManifestoSlide';
import TimelineDrawSlide from './slides/TimelineDrawSlide';
import MetricsGridSlide from './slides/MetricsGridSlide';
import PortraitSplitSlide from './slides/PortraitSplitSlide';
import TableSlide from './slides/TableSlide';
import ClosingSlide from './slides/ClosingSlide';
import ArtistGridSlide from './slides/ArtistGridSlide';
import ArtistStatsSlide from './slides/ArtistStatsSlide';

const LAYOUT_MAP: Record<string, React.FC<{ slide: ComputedSlide; index: number }>> = {
  heroCenter: HeroCenterSlide,
  editorialLeft: EditorialLeftSlide,
  editorialSplit: EditorialSplitSlide,
  cardGrid: CardGridSlide,
  manifesto: ManifestoSlide,
  timeline: TimelineDrawSlide,
  metricsGrid: MetricsGridSlide,
  portraitSplit: PortraitSplitSlide,
  table: TableSlide,
  closing: ClosingSlide,
  artistGrid: ArtistGridSlide,
  artistStats: ArtistStatsSlide,
};

interface SlideRendererProps {
  slide: ComputedSlide;
  index: number;
  isActive?: boolean;
}

const SlideRenderer = ({ slide, index, isActive = false }: SlideRendererProps) => {
  const Component = LAYOUT_MAP[slide.layout] || EditorialLeftSlide;
  return (
    <SlideActiveContext.Provider value={isActive}>
      <Component slide={slide} index={index} />
    </SlideActiveContext.Provider>
  );
};

export default SlideRenderer;
