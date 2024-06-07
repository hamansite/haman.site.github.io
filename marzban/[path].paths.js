import fs from 'fs'

var walk = function (dir) {
  var results = []
  var list = fs.readdirSync(dir)
  list.forEach(function (file) {
    file = dir + '/' + file
    var stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file))
    } else {
      results.push(file)
    }
  })
  return results
}

const developmentContent = (location) => `
<script setup>
import {withBase, useRouter} from 'vitepress'

const { go } = useRouter();

go(withBase('/fa/${location}'))
</script>
`

export default {
  async paths() {
    return walk('./marzban/fa').map((filePath) => {
      const path = filePath.replace('./marzban/fa/', '').replace('.md', '')
      return {
        params: { path },
        content: developmentContent(path),
      }
    })
  },
}
