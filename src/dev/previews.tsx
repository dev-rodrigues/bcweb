import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'

import { PaletteTree } from './palette'
import {Training} from "@/pages/app/training";

const ComponentPreviews = () => {
  return <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Training">
          <Training/>
      </ComponentPreview>
  </Previews>
}

export default ComponentPreviews
