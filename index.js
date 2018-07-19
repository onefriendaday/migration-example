const StoryblokClient = require('storyblok-js-client')
const fs = require('fs')

const Storyblok = new StoryblokClient({
  headers: {
    'Authorization': process.env.STORYBLOK_OAUTH
  }
})

const targetSpaceId = process.env.TARGET_SPACE

const Importer = {
  async start() {
    await this.createStories()
    process.exit(0)
  },

  migrateJson(oldJson) {
    let storyJson = {}

    storyJson.name = oldJson.title
    storyJson.slug = oldJson.slug

    transformedPostBody = []

    oldJson.postBody.forEach((section) => {
      for (let item in section) {
        let block = section[item]
        block.component = item
        transformedPostBody.push(block)
      }
    })

    storyJson.content = {
      component: 'article',
      cardImage: oldJson.cardImage,
      metaDescription: oldJson.metaDescription,
      metaTitle: oldJson.metaTitle,
      postAuthor: oldJson.postAuthor,
      postBody: transformedPostBody
    }

    return storyJson
  },

  async createStories() {
    let exampleJson = fs.readFileSync('./example.json')
    let migratedJson = this.migrateJson(JSON.parse(exampleJson.toString()))

    await this.createStory(migratedJson)
  },

  async createStory(content) {
    try {
      let newStory = await Storyblok.client.post(`spaces/${targetSpaceId}/stories`, {
        story: content
      })

      console.log(`Story ${newStory.data.story.name} created`)
    } catch(e) {
      throw new Error(e)
    }
  }
}

Importer.start()
