module.exports = function remarkGFMWrapper(opts) {
  const data = this.data()
  return async (tree) => {
    // highlight-next-line
    const { gfm } = await import("micromark-extension-gfm")
    // highlight-next-line
    const { gfmFromMarkdown, gfmToMarkdown } = await import("mdast-util-gfm")
    add("micromarkExtensions", gfm(opts))
    add("fromMarkdownExtensions", gfmFromMarkdown())
    add("toMarkdownExtensions", gfmToMarkdown(opts))
  }

  function add(field, value) {
    const list = /** @type {unknown[]} */ (
      data[field] ? data[field] : (data[field] = [])
    )
    list.push(value)
  }
}
