import { createElement, ScriptableScene } from "metaverse-api";
import { sleep } from "./src/utils";



export default class DonutAnimation extends ScriptableScene {
    state = {
      
        swimstate: false,
        currentPos: -7
    };
 
    async sceneDidMount() {
        this.eventSubscriber.on(`raya_click`, () => this.clickedOnManta());
    }

    clickedOnManta() {
        this.setState({swimstate: !this.state.swimstate });
        this.setState({currentPos: 5 });
    }

    async updateManta()
    {
        if (this.state.swimstate == true)
            {
                
                this.state.currentPos = this.state.currentPos +  1;
                if (this.state.currentPos > 5)
                {
                    this.state.currentPos = -7;
                }

            }
    }

    async render() {
        const mantaPos = {
            x: 1,
            y: 6,
            z: this.state.currentPos
        };
      

        return (    
            <scene  position={{ x: 10, y: 0, z: 10 }}>
                <gltf-model 
                    src="models/donas2.gltf"
                />
                <gltf-model
                    id="raya"
                    position={mantaPos}
                    transition={ { position: { duration: 30000, timing: "linear" } } }
                    scale={1}
                    src="models/mantaraya3.gltf"
                    skeletalAnimation={
                        this.state.swimstate
                            ? [
                                  { clip: "manta_swim" , playing: true, loop:true }
                
                              ]
                            : [
                                { clip: "manta_swim"
                                , playing: false, loop:false }
                              ]
                    }

                />
    
            </scene>
        );
    }
}
