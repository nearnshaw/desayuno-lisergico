import { createElement, ScriptableScene, Vector3Component } from "metaverse-api"



export interface IState {
    swimstate: boolean,
    mantaPos: Vector3Component,
    rotacionFlashera: number;
    recorrido: Vector3Component[],
    angulos: Vector3Component[],
    anguloMano: Vector3Component,
    posMano: Vector3Component,
    
  }

export default class DonutAnimation extends ScriptableScene {
    state = {
      
        swimstate: true,
        mantaPos: 0,
        //currentPos: {x: 0, y: 0, z: 0},
        rotacionFlashera: 0,
        recorrido:[
            {x: 1,y: 16,z: 1},
            {x: 1,y: 16,z: 19},
            {x: 19,y: 16,z: 19},
            {x: 19,y: 16,z: 1}
        ],
        angulos:[
            {y:270, x:0, z:17},
            {y:0, x:0, z:17},
            {y:90, x:0, z:17},
            {y:180, x:0, z:17}
        ],
        posMano:{ x: 10.5, y: 3.5, z: 9 },
        anguloMano:{y:0, x:0, z:17}
 
    };
 
    async sceneDidMount() {
        this.eventSubscriber.on(`raya_click`, () => {
            console.log("clicked");
            this.clickedOnManta();
            
            });
        this.subscribeTo('positionChanged', e => {

            this.pointAt(e.position);


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
              }, 10000);
           
            // this.timerID = setInterval(
            //     () => this.tick(),
            //     1000
            //   );
            // }  
            this.moveManta()

         

    }

    async clickedOnManta() {  
    }

    async pointAt(v: Vector3Component){
       
 
            var dire =  {x: (v.x-this.state.posMano.x), z:(v.z- this.state.posMano.z)};
            
            console.log(dire);
            var angulo = Math.atan2(dire.x, dire.z) *(180/Math.PI) ;
            //console.log(angulo);
            var anguloEntero = {x:0, y:angulo, z:17};
            this.setState({anguloMano: anguloEntero });

    }

    async moveManta() {

        var pos = this.state.mantaPos + 1;
        if (pos >= this.state.recorrido.length)
        {pos = 0};
        this.setState({mantaPos: pos});
        

    

        
    }


    async render() {
        

      

        return (    
            <scene  position={{ x: 0, y: -0.35, z: 0 }}>
                <gltf-model 
                    src="models/mesa.gltf"
                    scale={1.5}
                    position={{ x: 15, y: 0, z: 10 }}
                />
                 <gltf-model 
                    src="models/donutnado.gltf"
                    position={{ x: 10, y: 13, z: 10 }}
                    scale= {2}
                    rotation= {{y: this.state.rotacionFlashera, x:45, z:0}}
                    transition={ { rotation: { duration: 250, timing: "linear" } } }
                />
                <gltf-model
                    id="raya"
                    position={this.state.recorrido[this.state.mantaPos]}
                    rotation={this.state.angulos[this.state.mantaPos]}
                    transition={{ 
                        position: { duration: 10000, timing: "linear" }, 
                        rotation: { duration: 1000, timing: "ease-in-out" } 
                    }}
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
                <entity rotation= {this.state.anguloMano}
                        position={this.state.posMano}
                        transition={{ rotation: { delay:100, duration: 400, timing: "ease-in" } }}
                        >
                    <gltf-model 
                        src="models/mano.gltf"
                        scale={1}
                        rotation={{x:0,y:90,z:17}}
                       
                    />
                </entity>
                

    
            </scene>
        );
    }
}
