import PlatForm from '../class/PlatFormClass'
import Repository from '../class/entities/Repository'
import config from '../config'

const PLATFORM = [
  { x: 50, y: 290, width: 320, height: 50 },
  { x: config.WIDTH - 320, y: 440, width: 320, height: 50 },
  { x: 0, y: config.HEIGHT, width: config.WIDTH, height: 50 },
]
export const usePlatform = () => {
  const platforms = new Repository<PlatForm>() // 地面

  const createPlatformObject = () => {
    PLATFORM.forEach((ob) => {
      const platform = new PlatForm({
        x: ob.x,
        y: ob.y,
        width: ob.width,
        height: ob.height,
      })
      platforms.add(platform)
    })
  }

  return {
    platforms,
    createPlatformObject,
  }
}
