() =>  {
    export const runOnScroll = function (evt) {
        let s = evt.deltaY
        const x = evt.offsetX
        const y = evt.offsetY
        s = s > 0 ? 2 : 0.5
      
        const worldPos = {
          x: (x - app.stage.x) / app.stage.scale.x,
          y: (y - app.stage.y) / app.stage.scale.y,
        }
        const newScale = { x: app.stage.scale.x * s, y: app.stage.scale.y * s }
        const newScreenPos = {
          x: worldPos.x * newScale.x + app.stage.x,
          y: worldPos.y * newScale.y + app.stage.y,
        }
        app.stage.x -= newScreenPos.x - x
        app.stage.y -= newScreenPos.y - y
        app.stage.scale.x = newScale.x
        app.stage.scale.y = newScale.y
      }
      
      window.addEventListener("mousewheel", runOnScroll, { passive: true })
      
}()