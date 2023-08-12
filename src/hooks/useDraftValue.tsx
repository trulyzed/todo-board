import { useMemo } from "react"

export const useDraftValue = (canDraft: boolean, draftId?: string) => {
  const value = useMemo<string | undefined>(() => {
    if (!canDraft || !draftId) return
    const value = localStorage.getItem(`draft_${draftId}`)
    return value || undefined
  }, [canDraft, draftId])

  return value
}