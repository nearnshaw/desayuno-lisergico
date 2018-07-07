import { createElement, ScriptableScene } from "metaverse-api"



export default class DonutAnimation extends ScriptableScene {
    state = {
      
        swimstate: true,
        mantaPos: {
            x: 1,
            y: 6,
            z: -7
        },
        //currentPos: {x: 0, y: 0, z: 0},
        rotacionFlashera: 0
 
    };
 
    async sceneDidMount() {
        this.eventSubscriber.on(`raya_click`, () => {
            console.log("clicked");
            this.clickedOnManta();
            
            });
        this.subscribeTo('positionChanged', e => {
            // complicated version
           /*  const deltaX =  e.position.x - this.state.currentPos.x;
            const deltaZ =  e.position.z - this.state.currentPos.z;
            var totalRot = (Math.abs(deltaX) + Math.abs(deltaZ))/10;
            if ((deltaX + deltaZ) < 1)
            { totalRot *= -1 };
            console.log(totalRot);
            const donasRotan = this.state.rotacionFlashera + totalRot; */
            // basic version
            const donasRotan = ( e.cameraPosition.x + e.cameraPosition.z) * 10;
            this.setState({rotacionFlashera: donasRotan});
            });
            
            setInterval(() => {
                this.moveManta();
              }, 3000);
           
            // this.timerID = setInterval(
            //     () => this.tick(),
            //     1000
            //   );
            // }  

         

    }

    async clickedOnManta() {

       
    }

    async moveManta() {

        const mantaPosCurrent = {
            x: 1,
            y: 6,
            z: this.state.mantaPos.z + 5
        };
        this.setState({mantaPos: mantaPosCurrent });

        
    }


    async render() {
        

      

        return (    
            <scene  position={{ x: 10, y: 0, z: 10 }}>
                <gltf-model 
                    src="models/mesa.gltf"
                    scale={1.5}
                    position={{ x: 5, y: 0, z: 0 }}
                />
                 <gltf-model 
                    src="models/donutnado.gltf"
                    position={{ x: 0, y: 13, z: 0 }}
                    scale= {2}
                    rotation= {{y: this.state.rotacionFlashera, x:45, z:0}}
                    transition={ { rotation: { duration: 250, timing: "linear" } } }
                />
                <gltf-model
                    id="raya"
                    position={this.state.mantaPos}
                    rotation={{y:0, x:0, z:17}}
                    transition={ { position: { duration: 10000, timing: "linear" } } }
                    scale={1}
                    src="models/mantaraya.gltf"
                    skeletalAnimation={
                        this.state.swimstate
                            ? [
                                  { clip: "manta_swim2" , playing: true, loop:true }
                
                              ]
                            : [
                                { clip: "manta_swim2"
                                , playing: false, loop:false }
                              ]
                    }
                      
                />
                <box color="ff0000"/>

    
            </scene>
        );
    }
}
