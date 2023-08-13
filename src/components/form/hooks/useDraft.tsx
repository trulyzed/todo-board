import { useCallback, useEffect, useMemo } from "react"

const isomorphicLocalStorage = typeof window !== 'undefined' ? localStorage : undefined

type UseDraftArguments = {
  canDraft: boolean
  draftId?: string
  unsavedValue?: string
}

export const useDraft = ({
  canDraft,
  draftId,
  unsavedValue,
}: UseDraftArguments) => {
  const draft = useMemo<string | undefined>(() => {
    if (typeof window === undefined) return
    if (!canDraft || !draftId) return
    const value = isomorphicLocalStorage?.getItem(`draft_${draftId}`)
    return value || undefined
  }, [canDraft, draftId])

  const saveDraft = useCallback((value: string) => {
    if (!canDraft) return
    localStorage.setItem(`draft_${draftId}`, value)
  }, [canDraft, draftId])

  useEffect(() => {
    if (!canDraft) return
    const handleBeforeUnload = () => {
      if (unsavedValue) saveDraft(unsavedValue)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [saveDraft, canDraft, unsavedValue])

  return {
    draft,
    saveDraft
  }
}
