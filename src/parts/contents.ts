
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Point } from "../libs/point";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _tg:HTMLElement;
  private _tgA:Array<HTMLElement> = [];
  private _tgB:Array<HTMLElement> = [];
  private _pos:Point = new Point()

  constructor(opt:any) {
    super(opt)

    const textA = 'devdev.Incはインタラクティブなデジタルコンテンツの開発をする会社です。プログラミングを使ったアニメーションやインタラクションの実装を得意としています。';
    const textB = '健康診断の結果が好ましくなかったので外食を控えるようにしてます。だけどビールはやめれないので朝と昼は糖質制限をして、夜は今までどおりで様子を見ます。';

    let txt = '';
    let arrA = Array.from(textA);
    let arrB = Array.from(textB);
    for(let i = 0; i < Math.max(arrA.length, arrB.length); i++) {
      txt += '<span class="innerA">' + arrA[i % arrA.length] + '</span>';
      txt += '<span class="innerB">' + arrB[i % arrB.length] + '</span>';
    }
    // console.log(txt)

    this._tg = document.querySelector('.l-main > .inner') as HTMLElement;
    this._tg.innerHTML = txt;

    document.querySelectorAll('.innerA').forEach((val) => {
      this._tgA.push(val as HTMLElement);
    });

    document.querySelectorAll('.innerB').forEach((val) => {
      this._tgB.push(val as HTMLElement);
    });

    this._resize();
  }


  protected _update(): void {
    super._update();

    // モニターサイズと位置
    const displayWidth = window.screen.width;
    // const displayHeight = window.screen.height;
    const displayX = window.screenX;
    // const displayY = window.screenY;

    this._pos.x += (displayX - this._pos.x) * 0.1

    const sw = Func.instance.sw();

    const minScale = 1
    const maxScale = 50

    const scaleA = Util.instance.map(this._pos.x, maxScale, minScale, 0, displayWidth - sw);
    const scaleB = Util.instance.map(this._pos.x, minScale, maxScale, 0, displayWidth - sw);

    this._tgA.forEach((val) => {
      Tween.instance.set(val, {
        fontSize:scaleA,
      })
    })

    this._tgB.forEach((val) => {
      Tween.instance.set(val, {
        fontSize:scaleB,
      })
    })
  }


  protected _resize(): void {
    super._resize();
  }
}