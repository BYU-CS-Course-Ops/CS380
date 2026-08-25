> **This is a teaching sample.** It proposes the *same project* as `resources/Sample-Proposal-Strong.md`, written by someone who skipped discovery and never cut anything. It is not a strawman — it is the proposal a capable student writes in one evening, and most of the mistakes in it are mistakes of *speed*, not ability.
>
> Read it before class. Mark the places you stop believing the author. We will dissect it together in Session 7, and you will review a real classmate's draft in Session 8 — the failures below are the ones you will actually see.

---

# CostumeHub — A Complete Costume Management Platform

**Author:** J. Doe · CS 301R · Written Proposal (CP3)

## Executive summary

Costume management is a huge problem for theaters everywhere. Currently most theaters use outdated methods like paper and spreadsheets, which leads to lost items, wasted money, and frustration. CostumeHub will revolutionize the way theaters handle their costume inventory by providing a modern, all-in-one platform with powerful features including barcode scanning, rentals, budget tracking, and AI-powered recommendations. With an intuitive interface and a mobile app for both iOS and Android, CostumeHub will make costume management easy for everyone from community theaters to professional companies to schools and dance studios. This proposal describes the problem, the solution, the technical approach, and the plan to deliver a working product this semester.

## Problem and users

Theaters everywhere struggle to keep track of their costumes. Anyone who has been involved in theater knows how chaotic the costume department can get, especially during a big production. Items get lost, nobody knows what the theater already owns, and money is wasted buying duplicates.

The users of CostumeHub include community theaters, high school and university drama departments, dance studios, church and community groups, cosplayers, and eventually professional theater companies and costume rental businesses. This is a large market with a clear unmet need.

I talked to my aunt, who does costumes for her church's Christmas program, and she said their system is "a total mess" and that they lose things every year. I also searched online and found many Reddit posts from theater people complaining about the same problems, which confirms that this is a widespread issue and not just a local one.

## Solution overview

CostumeHub will be a complete, modern platform for costume management. Users will be able to catalog their entire inventory with photos, scan barcodes for fast check-in and check-out, manage rentals to other organizations, track budgets and purchase orders, schedule fittings, and get AI-powered suggestions for building outfits from what they already own. The platform will be available on the web and as a mobile app so users can access it from anywhere.

## Core features

- Inventory catalog with photos and detailed item information
- Barcode scanning for fast check-in and check-out
- Mobile app for iOS and Android
- Check-out and return tracking with automatic reminder emails
- Rental management so theaters can lend costumes to each other
- Budget tracking and purchase orders
- Measurements database and fitting scheduler
- Laundry and repair tracking
- Sewing project management for costumes being built
- Analytics dashboard showing usage statistics
- AI-powered outfit suggestions based on the existing inventory
- User accounts with permissions for administrators and regular users

## Non-goals

None at this time. The goal of CostumeHub is to be a complete solution, so I don't want to rule anything out this early. If something turns out to be too difficult I will adjust the plan later in the semester.

## Technical approach

CostumeHub will be built with React on the front end and Node.js on the back end, which are modern, industry-standard technologies with lots of community support. For the database I will probably use MongoDB because it's flexible and works well with JavaScript. The mobile app will be built in React Native so that the same code can run on both iOS and Android. For the AI features I will call an LLM API. Hosting will be on a cloud provider such as AWS.

I have used React before in a previous class, so I am confident about the front end. I have not used React Native or MongoDB yet, but they are both well documented and I expect to pick them up quickly. I have not run a spike yet, but I plan to start with the parts I already know and work up to the harder features.

## Risks and mitigation

- **Time management.** The semester is busy and I have other classes. I will manage my time carefully and start early.
- **Bugs.** Bugs may occur during development. I will test my code thoroughly.
- **Scope.** The project is ambitious. If I get behind, I will focus on the most important features first.
- **Learning curve.** Some technologies are new to me. I will use documentation and online tutorials.

## MVP definition

The MVP will include the inventory catalog with photos, barcode scanning, the mobile app, check-out and return tracking, and basic rental support. This should be achievable by the end of the semester working about 10 hours per week for 14 weeks, which is 140 hours — plenty of time for a project of this size. If things go well, I would also like to add the AI outfit suggestions as a stretch goal before the final demo.

## Success criteria

- Users love the app and find it easy to use.
- The app makes costume management significantly more efficient.
- The platform is stable and bug-free.
- Reaching 10,000 users within the first year.

---

*I am excited about this project and I think it has a lot of potential. Costume management is an underserved market and CostumeHub could become the go-to solution for theaters everywhere.*
