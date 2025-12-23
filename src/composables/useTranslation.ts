import { ref } from 'vue'

// Simple translation cache
const translationCache = new Map<string, string>()

// Load cache from localStorage
const loadCache = () => {
  try {
    const cached = localStorage.getItem('noveris_translation_cache')
    if (cached) {
      const data = JSON.parse(cached)
      Object.entries(data).forEach(([key, value]) => {
        translationCache.set(key, value as string)
      })
    }
  } catch (e) {
    console.error('Failed to load translation cache:', e)
  }
}

// Save cache to localStorage
const saveCache = () => {
  try {
    const data: Record<string, string> = {}
    translationCache.forEach((value, key) => {
      data[key] = value
    })
    localStorage.setItem('noveris_translation_cache', JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save translation cache:', e)
  }
}

// Initialize cache
if (typeof window !== 'undefined') {
  loadCache()
}

// Detect if text is primarily Chinese
export const isChinese = (text: string): boolean => {
  const chineseRegex = /[\u4e00-\u9fff]/g
  const matches = text.match(chineseRegex)
  if (!matches) return false
  // If more than 10% of characters are Chinese, consider it Chinese
  return matches.length / text.length > 0.1
}

// Generate cache key
const getCacheKey = (text: string, targetLang: string): string => {
  const hash = text.slice(0, 100) + text.length.toString()
  return `${targetLang}:${hash}`
}

// Translate text using Google Translate (free endpoint)
export const translateText = async (
  text: string,
  sourceLang: string = 'zh-CN',
  targetLang: string = 'en'
): Promise<string> => {
  const cacheKey = getCacheKey(text, targetLang)

  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  try {
    // Use Google Translate's free API
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Translation failed')
    }

    const data = await response.json()

    // Extract translated text from response
    let translatedText = ''
    if (Array.isArray(data) && Array.isArray(data[0])) {
      translatedText = data[0]
        .filter((item: unknown) => Array.isArray(item) && item[0])
        .map((item: unknown[]) => item[0])
        .join('')
    }

    if (translatedText) {
      // Cache the result
      translationCache.set(cacheKey, translatedText)
      saveCache()
      return translatedText
    }

    return text // Return original if translation failed
  } catch (error) {
    console.error('Translation error:', error)
    return text // Return original text on error
  }
}

// Composable for using translation in components
export const useTranslation = () => {
  const isTranslating = ref(false)
  const translationError = ref<string | null>(null)

  const translate = async (
    text: string,
    sourceLang: string = 'auto',
    targetLang: string = 'en'
  ): Promise<string> => {
    isTranslating.value = true
    translationError.value = null

    try {
      const result = await translateText(text, sourceLang, targetLang)
      return result
    } catch (error) {
      translationError.value = error instanceof Error ? error.message : 'Translation failed'
      return text
    } finally {
      isTranslating.value = false
    }
  }

  const translateMarkdown = async (
    markdown: string,
    sourceLang: string = 'zh-CN',
    targetLang: string = 'en'
  ): Promise<string> => {
    // Split markdown by code blocks to preserve them
    const codeBlockRegex = /```[\s\S]*?```/g
    const codeBlocks: string[] = []
    let index = 0

    // Extract code blocks
    const textWithPlaceholders = markdown.replace(codeBlockRegex, (match) => {
      codeBlocks.push(match)
      return `__CODE_BLOCK_${index++}__`
    })

    // Also preserve inline code
    const inlineCodeRegex = /`[^`]+`/g
    const inlineCodes: string[] = []
    let inlineIndex = 0

    const textWithAllPlaceholders = textWithPlaceholders.replace(inlineCodeRegex, (match) => {
      inlineCodes.push(match)
      return `__INLINE_CODE_${inlineIndex++}__`
    })

    // Translate the text (split into chunks if too long)
    const chunks = splitTextIntoChunks(textWithAllPlaceholders, 4000)
    const translatedChunks = await Promise.all(
      chunks.map((chunk) => translate(chunk, sourceLang, targetLang))
    )

    let translatedText = translatedChunks.join('')

    // Restore inline code
    inlineCodes.forEach((code, i) => {
      translatedText = translatedText.replace(`__INLINE_CODE_${i}__`, code)
    })

    // Restore code blocks
    codeBlocks.forEach((block, i) => {
      translatedText = translatedText.replace(`__CODE_BLOCK_${i}__`, block)
    })

    return translatedText
  }

  return {
    isTranslating,
    translationError,
    translate,
    translateMarkdown,
    isChinese
  }
}

// Helper function to split text into chunks
const splitTextIntoChunks = (text: string, maxLength: number): string[] => {
  if (text.length <= maxLength) return [text]

  const chunks: string[] = []
  let currentChunk = ''

  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/)

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk.trim())
        currentChunk = ''
      }

      // If single paragraph is too long, split by sentences
      if (paragraph.length > maxLength) {
        const sentences = paragraph.split(/(?<=[.!?。！？])\s*/)
        for (const sentence of sentences) {
          if (currentChunk.length + sentence.length > maxLength) {
            if (currentChunk) {
              chunks.push(currentChunk.trim())
              currentChunk = ''
            }
          }
          currentChunk += sentence + ' '
        }
      } else {
        currentChunk = paragraph + '\n\n'
      }
    } else {
      currentChunk += paragraph + '\n\n'
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }

  return chunks
}

export default useTranslation
