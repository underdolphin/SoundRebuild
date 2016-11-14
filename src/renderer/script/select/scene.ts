/**
 * scene class
 */
export class Scene {
    /**
     * for scene transition
     */
    scene() {
        if (this.initScene()) {
            this.selectScene();
        }
    }

    /**
     * scene for initial processing
     * @return {boolean} return true when end of initialize
     */
    initScene():boolean {
        // TODO: not implements
        return true;
    }

    /**
     * scene for tune select
     */
    selectScene() {
        // TODO: not implements
    }
}