import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const MAIL_KEY = 'mailDB'
_createEmails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getFilterFromSearchParams,
}
function _createEmails() {
    let emails = utilService.loadFromStorage(MAIL_KEY)

    if (!emails || !emails.length) {
        emails = []
        const fromTos = ['momo@momo.com', 'user@appsus.com']
        for (let i = 0; i < 20; i++) {
            const email = {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: utilService.makeLorem(40),
                isRead: Math.random() > 0.7,
                sentAt: 1551133930594,
                removedAt: null,
                from: fromTos[utilService.getRandomIntInclusive(0, 1)],
                to: fromTos[utilService.getRandomIntInclusive(0, 1)]
            }
            emails.push(email)
        }
        utilService.saveToStorage(MAIL_KEY, emails)
    }
    console.log(emails)
    return emails
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(emails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regExp.test(email.from) || regExp.test(email.subject) || regExp.test(email.body))
            }
            if (filterBy.sentAt) {
                emails = emails.filter(email => email.sentAt >= filterBy.sentAt)
            }

            return emails
        })
}

function getFilterFromSearchParams(searchParams) {
    return {
        txt: searchParams.get('txt') || '',
    }
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}
