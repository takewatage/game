import { useScene } from "phavuer";


export const usePhaser = () => {

  const scene = useScene()

  const onCollider = (ob1, ob2) => {
    scene.physics.collide(ob1, ob2)
  }

  return { onCollider }
}
