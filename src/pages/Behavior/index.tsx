import { useRef } from "react";

function Behavior() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return <div className="flex flex-col gap-4 p-4">
    <h3>阻止元素的默认行为</h3>
    <input type="text" className="border border-sky-400 p-2" onInput={(evt) => evt.preventDefault()} />
    <input type="password" className="border border-sky-400 p-2" />
    <input type="file" className="border border-sky-400 p-2" onClick={(evt) => evt.preventDefault()} />
    <details open>
      <summary>权利法案</summary>
      <section>
        <ul>
          <li>言论自由、宗教信仰自由、和平集会自由和向政府请愿的自由。</li>
          <li>持有和携带武器的权利。</li>
          <li>军队不得在和平时期驻扎在民房中，除非有立法授权。</li>
          <li>免受无理搜查和扣押的权利。</li>
          <li>在刑事案件中，被告人有权获得迅速、公开和公正的审判，以及由公正的陪审团审判的权利。</li>
          <li>在刑事案件中，被告人有权知晓被控告的罪名和面对证人的权利。</li>
          <li>在刑事案件中，被告人有权不自证其罪。</li>
          <li>使宪法没有明确列出某些权利，人民仍然拥有这些权利。</li>
          <li>宪法未授予联邦政府的权利，也未禁止各州行使的权利，由人民和各州保留。</li>
        </ul>
      </section>
    </details>
    <dialog ref={dialogRef}>
      <div className="w-96 h-64">
        <div>Hello World</div>
        <button className="border border-y-red-400" type="button" onClick={() => {
          dialogRef.current.close();
        }}>close</button>
      </div>
    </dialog>
    <button className="w-16 border border-y-red-400" onClick={() => {
      dialogRef.current.showModal();
    }}>open</button>
  </div>
}

export default Behavior;