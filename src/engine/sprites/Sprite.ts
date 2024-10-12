import { Rectangle } from "../Rectangle"
import { Vector } from "../Vector"

/** Represents a sprite */
export class Sprite{

    /** The HTML image element that holds the image data */
    private _img:HTMLImageElement

    /** The number of frames in this sprite */
    private _frameCount:number = 1
    /** The width of each frame in the sprite */
    private _frameWidth:number = 0
    /** The height of each frame in the sprite */
    private _frameHeight:number = 0
    /** The number of frames that fit down the y-axis of the sprite*/
    private _rows:number = 1
    /** The number of frames that fit across the x-axis of the sprite */
    private _columns:number = 1

    /**
     * Constructor
     * @param src path to the image file
     * @param width width of the image
     * @param height height of the image
     * @param frameSize the size of one frame in an animated sprite
     */
    constructor(src:string, width:number,height:number, frameSize?:Vector){
        this._img = new Image(width*devicePixelRatio,height*devicePixelRatio)
        this._img.src = src
        if(frameSize){
            this._frameWidth = frameSize[0]
            this._frameHeight = frameSize[1]
            this._columns = Math.floor(width/frameSize[0])
            this._rows = Math.floor(height/frameSize[1])
            this._frameCount = this._rows * this._columns
        }
    }

    /** the width of the sprite's image */
    get width(){ return this._img.width }
    /** the height of the sprite's image */
    get height(){ return this._img.height }
    /** the HTMLImageElement that holds the image data */
    get img(){ return this._img }
    /** the number of frames in this sprite's animation */
    get frameCount(){ return this._frameCount }

    set width(value:number){ this._img.width = value }
    set height(value:number){ this._img.height = value }

    /**
     * Get a rectangle that indicates the source of the indicated frame in the animation
     * @param index the index of the frame in the animation
     * @returns a rectangle that indicate which part of the image corresponds to this frame
     */
    getFrame(index:number){

        if(this._frameCount===1)
            return new Rectangle(0,0,this.width,this.height)
        //clamp index
        const frame = index%this._frameCount

        const row = Math.floor(frame/this._columns)
        const col = frame % this._columns

        return new Rectangle(col*this._frameWidth,row*this._frameWidth, this._frameWidth, this._frameHeight)
    }
}