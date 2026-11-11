// Site-wide "everything has loaded" signal used by the loading screen.
//
// Covers: the window load event (scripts, stylesheets, images in the initial document),
// web fonts, images inserted after that event, and any async loads registered with
// trackAsset() (for example the 3D textures and model in the hero background).

const pending = new Set()

/** Register an async load so the loading screen waits for it. Returns the same promise. */
export const trackAsset = (promise) => {
  const settled = Promise.resolve(promise).catch(() => {})
  pending.add(settled)
  settled.finally(() => pending.delete(settled))
  return promise
}

const windowLoaded = () =>
  new Promise((resolve) => {
    if (document.readyState === "complete") resolve()
    else window.addEventListener("load", () => resolve(), { once: true })
  })

const imagesSettled = () =>
  Promise.all(
    Array.from(document.images).map((img) =>
      img.complete
        ? null
        : new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true })
            img.addEventListener("error", resolve, { once: true })
          })
    )
  )

export const whenAssetsReady = async () => {
  await windowLoaded()
  if (document.fonts?.ready) await document.fonts.ready
  await imagesSettled()
  while (pending.size) await Promise.all(Array.from(pending))
}
