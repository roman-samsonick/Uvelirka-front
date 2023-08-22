import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { IPropsWithClassname } from '../../../models/common.model';

const defaultState = {
  center: [52.094924, 23.689383],
  zoom: 18,
};
const placemarkGeometry = [52.094738, 23.689655];

export const MiniMap = ({ className }: IPropsWithClassname) => {
  return <YMaps>
    <Map
      width="100%"
      className={className}
      defaultState={defaultState}>
      <Placemark geometry={placemarkGeometry} />
    </Map>
  </YMaps>;
}
