describe('template spec', () => {
  it('passes', () => {
    cy.request({
      url: '/API/iotsim/simulate',
      qs: {
        "jobId": "64d2435e210dc2b36f223e3c"
      },
      //followRedirect: false, // turn off following redirects
    }).then((resp) => {
      // redirect status code is 302
      cy.log(resp)
      expect(resp.status).to.eq(200)
      expect(resp.body.message).to.equal('success')
      expect(resp.body.data2[0].ctimeToMaxCloudStorage).to.equal(3742)
      //expect(resp.redirectedToUrl).to.eq('http://localhost:8082/unauthorized')
    })
  })
})