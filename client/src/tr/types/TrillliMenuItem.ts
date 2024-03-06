//onClick: optional; if not provided, onClick behavior defaults to navigating to the link
type TrillliMenuItem = {
    text: string
    link?: string
    icon?: string
    hideAuthed?: boolean
    hideUnauthed?: boolean
    logIn?: boolean,
    logOut?: boolean
}

export default TrillliMenuItem