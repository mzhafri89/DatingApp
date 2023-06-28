using API.DTOs;
using API.Entities;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // * Only allow authorized users to access this controller
    [Authorize]
    // * Extends BaseApiController
    public class UsersController : BaseApiController
    {
        private IUserRepository _userRepository;

        private IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            this._userRepository = userRepository;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            // * Get users from the repository
            var members = await _userRepository.GetMembersAsync();

            // * return the users
            return Ok(members);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            // * Get user from the repository
            var member = await _userRepository.GetMemberByUsernameAsync(username);

            // * Return the user
            return Ok(member);
        }
    }
}
