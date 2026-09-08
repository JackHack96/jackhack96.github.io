---
title: "My adventure with homelabbing"
excerpt: "Diving into my recent homelab upgrade."
---

Some of the people who know me, particoularly the nerdy ones, are aware that among my hobbies I have a rather expensive one called "homelabbing", with which I run and manage various services for my digital life, from password managers to entire Google services replacements.

I started the homelabbing hobby back in 2017.
At the time, I was volunteering in my local [AVIS](#avis-side-note) branch as a general technician, and one of my first task was to build a PC for the office and digitalize most of the documents that were still on paper.
After having assembled the computer, I was left with a 3.5" 1TiB Western Digital Blue that I just replaced with a modern SSD, so I thought: "It would a pity to throw this away, it's slow but it's high capacity and it still works. I'll keep it!".
That's when I had an idea: why not attaching this disk to a low-power device like a Raspberry Pi and then use it as a NAS?
Thus I proceeded to order a Raspberry Pi 3 and an USB enclosure for the 3.5" drive. Setting it up was super easy, as there are ready-made distros for the Raspberry such as DietPi which simplifies the installation and the setup of various services. Another big advantage was that everyone in my home used Linux already so setting up a network share was rather easy with technolgies like NFS.
<details class="side-note" id="avis-side-note">
  <summary class="side-note-title">Side note for my foreign readers</summary>
  AVIS is an Italian blood donation association.
  In Italy the blood supply for the hospitals is gathered from volunteer-based donations, and there are various associations that promote the act of donation by organizing multiple social events during the year.
  Throughout my journeys abroad, I discovered that blood donation exists also in other countries, so I'd suggest you to check it out!
  Not only you normally get some perks like a payed day-off or free health checks, but you could potentially save a life every time you do a donation!
</details>

After a while, I said to myself: "I see that 95% of the time the Raspberry sits in idle, why not using it for something else too?", and that's when things started to get more interesting. I started digging into the homelab subreddit and discovered a whole new world, made of self-hosted services.
I tried experimenting with Pi Hole, a network-wide ad-blocking solution (which by the way works beautifully if you want to prevents fucking ads from showing in devices like the smart TV), and the popular Radarr + Jackett + qBittorrent combo, for movies, files, etc. I do not have an original picture, it looked very janky, something like this:
<figure class="post-figure">
  <img src="/img/blog/homelab-hardrive.webp" alt="external hard drive">
  <figcaption>Source: <a href="https://dphacks.com/2023/12/24/pineberry-pis-pi-5-pcie-ssd-adapters/" target="_blank" rel="noopener">dphacks.com</a></figcaption>
</figure>

As I went deeper in the homelab rabbit hole I bought a mini-ITX PC in order to build a proper firewall, based on pfSense.
I learned how to properly set up a NAT, virtual LANs, traffic shaping and so on. It was a really cool time and I enjoyed learning system administration concepts through a hands-on approach, especially considering that at the time I was still attending the University, where professors were using a theory-only modality of teaching and I felt like I was learning nothing really useful.
It also happened just a bit before COVID, so with us being 6 users on a 30Mbit/s LAN, stuff like traffic shaping really helped during quarantine.

During this time though I realized that a Raspberry was not enough. I started getting tired of not being able to copy a file at 1Gbps (as the RPi3 lacked a full Gigabit port), and I also had some reliability issues with some Dockers.
I needed something more powerful, and possibly more reliable, thus after some searches I found a very good deal on eBay: a second-hand HP Microserver Gen8. On paper it looked perfect, it came already modified with 16GB of DDR3 ECC RAM, an Intel Xeon E3-1220L, and 4 bays for 3.5" hard drives.
