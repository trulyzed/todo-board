import { useCallback, useEffect, useState } from "react"

type UseDraftArguments = {
  canDraft?: boolean
  draftId: string
  unsavedValue?: string
}

export const useDraft = ({
  canDraft,
  draftId,
  unsavedValue,
}: UseDraftArguments) => {
  const draftStorageKey = `draft_${draftId}`
  const [draft, setDraft] = useState<string>()

  useEffect(() => {
    if (!canDraft) return
    setDraft(localStorage.getItem(draftStorageKey) || undefined)
  }, [canDraft, draftStorageKey])

  const saveDraft = useCallback((value: string) => {
    if (!canDraft) return
    setDraft(value)
    localStorage.setItem(draftStorageKey, value)
  }, [canDraft, draftStorageKey])

  const clearDraft = useCallback(() => {
    if (!canDraft || !draft) return
    localStorage.removeItem(draftStorageKey)
    setDraft(undefined)
  }, [canDraft, draftStorageKey, draft])

  useEffect(() => {
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
    saveDraft,
    clearDraft
  }
}
